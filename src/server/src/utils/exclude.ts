type PrismaModel = Record<string, any>;

export function exclude<User extends PrismaModel, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  const filteredEntries = Object.entries(user).filter(([key, value]) => {
    return !keys.includes(key as Key) && value !== null && value !== undefined;
  });

  const result: any = {};
  for (const [key, value] of filteredEntries) {
    result[key] = value;
  }

  return result;
}
