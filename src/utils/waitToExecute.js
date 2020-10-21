const waitToExecute = (seconds, callback) => {
  setTimeout(() => {
    callback();
  }, seconds);
};

export default waitToExecute;
