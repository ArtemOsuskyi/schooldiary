import * as bcrypt from 'bcrypt';

bcrypt.hash('supersecretpassword', 12).then((result) => {
  console.log(result);
});
