import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'user' | null;

type UserRoleContextType = {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isRoleSelected: boolean;
};

const UserRoleContext = createContext<UserRoleContextType>({
  userRole: null,
  setUserRole: () => {},
  isRoleSelected: false,
});

export const useUserRole = () => useContext(UserRoleContext);

export const UserRoleProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  return (
    <UserRoleContext.Provider
      value={{
        userRole,
        setUserRole,
        isRoleSelected: userRole !== null,
      }}
    >
      {children}
    </UserRoleContext.Provider>
  );
};