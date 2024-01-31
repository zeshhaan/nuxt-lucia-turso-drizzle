import type { User } from "lucia";

/**
 * Custom hook for managing authentication state.
 * @returns The user state.
 */
export const useUser = () => {
  const user = useState<User | null>("user", () => null);
  return user;
};

export const useAuthenticatedUser = () => {
  const user = useUser();
  return computed(() => {
    const userValue = unref(user);
    if (!userValue) {
      throw createError(
        "useAuthenticatedUser() must be used within an authenticated context."
      );
    }
    return userValue;
  });
};
