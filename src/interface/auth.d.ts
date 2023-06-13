interface Login {
  email: string;
  password: string;
}

interface Register extends Login {
  repassword: string;
}
