const formatDate = (zuluDate) => {
  var date = new Date(zuluDate);
  var gbDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const convertTime = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours <= 12 ? "AM" : "PM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var minCont = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minCont + " " + ampm;
    return strTime;
  };
  return gbDate + " at " + convertTime(date);
};

export { formatDate };
