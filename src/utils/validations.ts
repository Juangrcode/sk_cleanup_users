const validations = {
  mongoId: /^[0-9a-fA-F]{24,24}$/,
  hexadecimal: /^#[0-9a-fA-F]{3,6}$/,
  name: /^[A-Ña-ñ0-9]+([\w\s][\\-]?)+$/,
  brands: /^(adidas|nike|vans|runner)+$/,
  categories: /^(shoes|straps|wallet)+$/,
  coinCodes: /^(EUR|USD|COP|MXN)+$/,
  email: /[\w\._]{5,30}\+?[\w]{0,10}@[\w\.\-]{3,}\.\w{2,5}$/,
  password: /^[a-zA-Z0-9\S ]{8,32}$/,
  phone: /^\(?\+?(\d{1}|\d{2}|\d{3})\)?[\s ]?[0-9 .-]{8,15}$/,
  time: /^\d{4}\/\d{2}\/\d{2}$/,
  date: /^\d{4}\/\d{2}\/\d{2}$/,
  gender: /^(men|woman|child|M|F|K|NO|NA|NOA|O|N)+$/,
  status_delivered: /^(cancelled|pause| received|inProgress|sent|delivered)+$/,
  url: /https?:\/\/[\w\-\\.]+:?[\w]+\.?\w{2,5}\/?\S*/
}

export default validations
