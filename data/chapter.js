/*
 * Your chapter's settings. This is the file to edit when you fork Chapter Compass.
 *
 * The defaults are the Philadelphia pilot: UNA-Greater Philadelphia as an example.
 * Replace the values with your own chapter's. Every field is optional.
 * Partner names are examples of local organizations a chapter might invite,
 * not endorsements or confirmed partnerships.
 */
window.CC = window.CC || {};
window.CC.chapter = {
  name: "UNA-Greater Philadelphia",
  shortName: "UNA-GP",
  city: "Philadelphia",
  // Where people go to join or donate. Point this at your chapter's own page.
  joinUrl: "https://unausa.org/",
  hashtag: "#UNAGP",
  // The default first item in every event's access statement.
  accessContact: "",
  // Example local partners, keyed by issue id from data/issues.js.
  localPartners: {
    transit: ["Transit Forward Philadelphia", "Mayor's Commission on People with Disabilities"],
    disability: ["Disability Pride Pennsylvania", "Mayor's Commission on People with Disabilities"],
    voting: ["Committee of Seventy", "Free Library of Philadelphia"],
    heat: ["Net Impact Philadelphia", "Free Library of Philadelphia"],
    youth: ["Campus UNA chapters in the region"]
  }
};
