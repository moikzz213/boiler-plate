function dollarMS(name) {
    return name
        ? name
              .split(" ")
              .slice(0, 2)
              .join(" ")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "?";
}
function percentageMS(name) {
    return name
        ? name
              .split(" ")
              .slice(0, 2)
              .join(" ")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "?";
}
function numberMS(name) {
    return name
        ? name
              .split(" ")
              .slice(0, 2)
              .join(" ")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "?";
}
export { dollarMS, percentageMS, numberMS };