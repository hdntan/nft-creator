const imageNameToUrl = (name: string) =>
  `${process.env.NEXT_PUBLIC_API_HOST}/${name}`;

export { imageNameToUrl };
