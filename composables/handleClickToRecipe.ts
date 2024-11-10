export const handleClickToRecipe = (id: number) => {
  const router = useRouter();
  console.log("trigger")
  router.push({ path: `/recipe/id/${id}` });
};
