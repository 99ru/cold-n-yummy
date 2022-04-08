// # Bcrypt and hashing passwords
const bcrypt = require("bcrypt");
const hashPassword = async (pw) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(pw, salt);
  console.log(salt);
  console.log(hash);
};

hashPassword("monkey");

/* 
salt = $2b$10$DJjLoqNiXzJyKWIjG/jQlu
hash =  $2b$10$DJjLoqNiXzJyKWIjG/jQluhbUiiOfUXghBfY5q3amIuhENjkplzxC
*/

// login true or false
const login = async (pw, hashedPw) => {
  const result = await bcrypt.compare(pw, hashedPw);
  if (result) {
    console.log("password is correct");
  } else {
    console.log("password is incorrect");
  }
};

// hashedpw('monkey)
login("monkey", "$2b$10$DJjLoqNiXzJyKWIjG/jQluhbUiiOfUXghBfY5q3amIuhENjkplzxC");
