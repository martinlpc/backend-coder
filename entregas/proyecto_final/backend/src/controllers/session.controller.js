import passport from 'passport';
import crypto from 'crypto'
import { createHash, validatePassword } from '../utils/bcrypt.js';
import { transporter } from '../index.js';
import { findUserByEmail } from '../services/userServices.js';
import { updateUser } from '../services/userServices.js';

export const registerUser = async (req, res, next) => {
  try {
    passport.authenticate('register', async (err, user) => {
      if (err) {
        req.logger.error(`Error on register procedure - ${err.message}`)
        return res.status(401).send({
          message: `Error on register`,
          error: err.message
        })
      }
      if (!user) {
        req.logger.info('Register process cancelled - Email already in use')
        return res.status(401).send('Email already in use')
      }
      req.logger.info(`User registered`)
      return res.status(200).send('User succesfully registered')
    })(req, res, next)
  } catch (error) {
    req.logger.error(`Error in register procedure - ${error.message}`)
    res.status(500).send({
      message: 'Internal server error',
      error: error.message
    })
  }
}

export const loginUser = async (req, res, next) => {
  try {
    passport.authenticate('login', (err, user) => {
      if (err) {
        req.logger.error(`Login error - ${err.message}`)
        return res.status(401).send({
          message: `Error on login`,
          error: err.message
        })
      }
      if (!user) {
        req.logger.info(`Login error - wrong credentials`)
        return res.status(401).send(`Wrong credentials`)
      }
      req.session.login = true
      req.session.user = user

      req.logger.info(`User logged in < ${req.session.user.email} >`)

      return res.status(200).send(`Welcome ${req.session.user.role} ${req.session.user.first_name}`)
    })(req, res, next)
  } catch (error) {
    req.logger.error(`Error in log-in procedure - ${error.message}`)
    res.status(500).send({
      message: "Server internal error",
      error: error.message
    })
  }
}

export const sendResetPasswordLink = async (req, res, next) => {
  /* 
    * Recibe mail
    * Guarda en mongo la cookie asociada al user_id
    * Envía a mail: {link de recuperacion}
  */
  const { email } = req.body

  try {
    const user = await findUserByEmail(email)
    if (!user) {
      res.status(404).send('Email not found in database')
      next()
    }
    // * User email found

    const resetLink = await generatePasswordResetLink(user, req, res)

    const mailToSend = {
      from: 'no-reply',
      to: email,
      subject: 'Password reset link',
      text: `Hola,
      Haz click en el siguiente enlace para reestablecer tu contraseña:
      ${resetLink}

      Si no solicitaste un cambio de contraseña, ignora este email.`
    }
    transporter.sendMail(mailToSend)

    req.logger.debug(user)

    req.logger.info(`Password reset link sent to ${email}`)
    res.status(200).send(`Password reset link sent to ${email}`)

  } catch (error) {
    req.logger.error(`Error in password reset procedure - ${error.message}`)
    res.status(500).send({
      message: 'Server internal error',
      error: error.message
    })
  }
}


export const resetPassword = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body

  try {
    const browserCookie = req.signedCookies.resetToken
    const user = await findUserByEmail(email)

    if (!user) {
      res.status(404).send('User email not found')
      return
    }

    if (!browserCookie || isTokenExpired(browserCookie, user.resetToken)) {
      res.status(401).send('Password reset link expired')
      return
    }

    if (user.resetToken.token !== browserCookie) {
      res.status(401).send('Unauthorized action')
      return
    }

    if (password !== confirmPassword) {
      res.status(400).send('Both password fields must match')
      return
    }

    if (await validatePassword(password, user.password)) {
      res.status(400).send('New password must be different from the current one')
      return
    }

    // * Requirements passed, now we change the password
    const newPassword = await createHash(password.toString())
    await updateUser(user._id, {
      password: newPassword,
      resetToken: { token: '' }
    })
    res.status(200).send('Password updated. Redirecting to login.')

  } catch (error) {
    res.status(500).send({
      message: 'Error on password reset',
      error: error.message
    })
  }
}

export const destroySession = async (req, res) => {
  try {
    if (req.session.login) {
      const username = req.session.user.first_name
      req.session.destroy()
      req.logger.info(`${username} logged out`)
      res.status(200).send(`Session "${username}" terminated.`)
    } else {
      req.logger.debug('No active session')
      return res.status(401).send(`No active session found`)
    }
  } catch (error) {
    req.logger.error(`Error in logout procedure - ${error.message}`)
    res.status(500).send({
      message: "Server internal error",
      error: error.message
    })
  }
}
export const getSession = async (req, res) => {
  try {
    if (req.session.login) {
      req.logger.debug(req.session.user)
      res.status(200).json(req.session.user);
    } else {
      req.logger.debug('No active session')
      return res.status(401).send(`No active session found`)
    }
  } catch (error) {
    res.status(500).send({
      message: "Server internal error",
      error: error.message
    })
  }
}

async function generatePasswordResetLink(user, req, res) {
  const token = crypto.randomBytes(20).toString('hex')

  await updateUser(user._id, {
    resetToken: {
      token: token,
      createdAt: Date.now()
    }
  })

  res.cookie('resetToken', token, {
    signed: true,
    maxAge: 1000 * 60 * 60
  })
  req.logger.info('Created password reset cookie')

  const link = `http://localhost:${process.env.PORT}/password/reset`
  return link
}

// TODO: aplicar testeo de timestamp en receivedCookie
function isTokenExpired(receivedCookie, storedToken) {
  const elapsedTime = Date.now() - storedToken.createdAt
  const expirationTime = 1000 * 60 * 60
  return elapsedTime >= expirationTime
}
