const proxifyUrl = (url) => `https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(
  url,
)}`;

export default proxifyUrl;