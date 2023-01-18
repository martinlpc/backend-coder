const funcion = (...num) => {
    console.log(num.reduce((a, b) => a + b, 0));
};

funcion(1, 2, 3, 4, 5);
