"use strict";
const socialLinks = ["www.facebook.com", "www.instagram.com", "twitter.com"];
const cardContainer = document.getElementById("root");

const cardElements = responseData.map((user) => createUserCard(user));
cardContainer.append(...cardElements);

function createUserCard(user) {
  return createElement(
    "li",
    { classNames: ["cardWrapper"] },
    createElement(
      "article",
      { classNames: ["cardContainer"] },
      createImageWrapper(user),
      createContentWrapper(user)
    )
  );
}

/**
 *
 * @param {string} tagName
 * @param {object} options
 * @param {string[]} options.classNames - css classes
 * @param {object} options.handlers - event handlers
 * @param {object} options.attributes - attributes
 * @param  {...Node} children
 * @returns {HTMLElement}
 */
function createElement(
  tagName,
  { classNames = [], handlers = {}, attributes = {} } = {},
  ...children
) {
  const elem = document.createElement(tagName);
  elem.classList.add(...classNames);
  /*
  attributes object example
  {
    src: "https://example.com",
    value: "text",
    name: "textInput",
  }
  */
  for (const [attrName, attrValue] of Object.entries(attributes)) {
    elem.setAttribute(attrName, attrValue);
  }

  for (const [eventType, eventHandler] of Object.entries(handlers)) {
    elem.addEventListener(eventType, eventHandler);
  }

  elem.append(...children);
  return elem;
}

function createCardImage(link) {
  const img = createElement("img", {
    classNames: ["cardImage"],
    handlers: {
      error: handleImageError,
      load: handleImageLoad,
    },
  });
  img.src = link;
  img.hidden = true;

  return img;
}
function createImageWrapper({ firstName, profilePicture }) {
  const imageWrapper = createElement(
    "div",
    {
      classNames: ["cardImageWrapper"],
    },
    createElement(
      "div",
      { classNames: ["initials"] },
      document.createTextNode(firstName[0] || "")
    ),
    createCardImage(profilePicture)
  );
  imageWrapper.style.backgroundColor = stringToColor(firstName || "");
  return imageWrapper;
}

function createContentWrapper({ firstName, lastName, contacts }) {
  return createElement(
    "div",
    {
      classNames: ["contentWrapper"],
    },
    createElement(
      "h3",
      { classNames: ["cardName"] },
      document.createTextNode(firstName || "")
    ),
    createElement(
      "p",
      { classNames: ["cardLastName"] },
      document.createTextNode(lastName || "")
    ),
    createElement(
      "div",
      {
        classNames: ["cardSocialLinks"],
      },
      ...createSocialLinks(contacts, socialLinks)
    )
  );
}

function createSocialLinks(contacts = [], social = []) {
  const result = [];
  if (contacts.length === 0) return;
  for (const link of contacts) {
    const url = new URL(link);
    if (social.includes(url.host)) {
      result.push(createLink(url));
    }
  }
  return result;
}

function createLink(url) {
  const a = document.createElement("a");
  const icon = document.createElement("i");
  //add object form key host:class
  let className = url.host.includes("facebook")
    ? "fa-facebook-f"
    : url.host.includes("twitter")
    ? "fa-twitter"
    : "fa-instagram";
  icon.classList.add("fab", className);
  a.href = url;
  a.append(icon);
  return a;
}

/*
  EVENT HANDLERS
*/

function handleImageError({ target }) {
  target.remove();
}

function handleImageLoad({ target }) {
  target.hidden = false;
}

/*
  UTILS
*/

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
}
