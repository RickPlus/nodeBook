const formatDate = (date, format, num = 0) => {
  if (!date) {
    return;
  }
  if (!format) {
    format = "yyyy-MM-dd";
  }
  switch (typeof date) {
    case "string":
      date = new Date(date.replace(/-/g, "/"));
      break;
    case "number":
      date = new Date(date);
      break;
  }
  let newDate = date.getTime() + (num * 60 * 60 * 24 * 1000);
  newDate = new Date(newDate);
  if (!(date instanceof Date)) {
    return;
  }
  if (!(newDate instanceof Date)) {
    return;
  }
  let dict = {
    "yyyy": newDate.getFullYear(),
    "M": newDate.getMonth() + 1,
    "d": newDate.getDate(),
    "h": newDate.getHours(),
    "m": newDate.getMinutes(),
    "s": newDate.getSeconds(),
    "MM": ("" + (newDate.getMonth() + 101)).substr(1),
    "dd": ("" + (newDate.getDate() + 100)).substr(1),
    "hh": ("" + (newDate.getHours() + 100)).substr(1),
    "mm": ("" + (newDate.getMinutes() + 100)).substr(1),
    "ss": ("" + (newDate.getSeconds() + 100)).substr(1)
  };
  return format.replace(/(yyyy|MM?|dd?|hh?|ss?|mm?)/g, function () {
    return dict[arguments[0]];
  });
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

module.exports = { formatDate, showBusy, showSuccess, showModel }
