import { useUser } from "~/composables/auth";

export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();
  const { data, error } = await useFetch("/api/auth/user");
  if (error.value) throw createError("Failed to fetch user.");
  user.value = data.value?.user ?? null;
});
