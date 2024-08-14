export const getImage = (url: {
  aws_file_url: string;
  path: string;
  filename: {
    raw: string;
  };
}) => {
  const data = url;
  const baseUrl = data?.aws_file_url;
  const path = data?.path;
  const filename = data?.filename.raw;
  return `${baseUrl}${path}/${filename}`;
};
