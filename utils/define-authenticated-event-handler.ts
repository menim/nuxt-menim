import type { UserWithId } from "~~/lib/auth";
import type { H3Context, H3Event } from "h3";

type AuthenticatedEvent = H3Event & {
  context: H3Context & {
    user: UserWithId;
  };
};

export default function defineAuthenticatedEventHandler<T>(handler: (event: AuthenticatedEvent) => T) {
  return defineEventHandler(async (event) => {
    if (!event.context.user) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      }));
    }
    return handler(event as AuthenticatedEvent);
  });
}
