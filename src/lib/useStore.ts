import create from 'zustand'

const useStore: any = create((set) => ({
  user: null,
  userRoles: [],
  setUser: (user: any) =>
    set(() => {
      if (!user) return
      const userRoles = user?.roles?.items.map((role: any) => role.name)

      // TODO set `plan` here based on Stripe subscription id.
      return { user, userRoles }
    }),
  plan: 'entry',
  setPlan: (plan: any) => set(() => ({ plan })),
}))

export default useStore
