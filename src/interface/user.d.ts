interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  citizenId: number | string;
  socialsFB?: string;
  socialsTW: ?string;
}

type UserState = Omit<User, "id">;

type UserProperties = keyof UserState;
