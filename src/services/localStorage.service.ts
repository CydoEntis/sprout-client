/* eslint-disable @typescript-eslint/no-explicit-any */
const LocalStorageService = {
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getItem<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(
        `Failed to parse localStorage item for key: "${key}"`,
        error
      );
      return null;
    }
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  },

  clearStorage(): void {
    localStorage.clear();
  },

  updateItem(key: string, updates: Record<string, any>): void {
    const currentData = this.getItem<Record<string, any>>(key) || {};
    const updatedData = { ...currentData, ...updates };
    this.setItem(key, updatedData);
  },

  updateUserAvatar(
    key: string,
    avatar: { id: number; name: string; displayName: string; imageUrl: string }
  ): void {
    const currentUser = this.getItem<Record<string, any>>(key);
    if (currentUser && currentUser.user) {
      currentUser.user.avatar = avatar;
      this.setItem(key, currentUser);
    } else {
      console.warn(
        `User data not found under key "${key}". Unable to update avatar.`
      );
    }
  },
};

export default LocalStorageService;
