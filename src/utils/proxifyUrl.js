const proxifyUrl = (url) =>
  `https://hexlet-allorigins.herokuapp.com/get?disableCache=true&url=${encodeURIComponent(url)}`;

export default proxifyUrl;
