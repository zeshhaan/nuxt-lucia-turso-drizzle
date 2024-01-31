export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (!session) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401,
    });
  }
  if (session.user.emailVerified) {
    throw createError({
      status: 422,
      message: "Email already verified",
    });
  }
  try {
    const token = await generateEmailVerificationToken(session.user.userId);
    await sendEmailVerificationLink(token);
    return {};
  } catch (e) {
    throw createError({
      status: 500,
      message: "An unknown error occurred",
    });
  }
});
