"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <i class="fa-star far"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <button class="remove-button">Remove</button>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // console.log(storyList.stories);
  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $('.remove-button').hide()
  $allStoriesList.show();

  // find stories that match storyId of currentUser.favorites and change class
  currentUser.favorites.forEach(function(item) {
    $(`#${item.storyId}`).children().first().removeClass('far')
    $(`#${item.storyId}`).children().first().addClass('fa')
  })
}

// We want to create a new instance of Story called favoritesList
// These should just be favorites 

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $allStoriesList.empty();

  if(currentUser.favorites.length < 1) {
    $allStoriesList.append($('<h3>Sorry, no stories to show</h3>'))
    return;
  }
  // console.log(storyList.stories);
  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** function that is called when users submit the form. This function
 * will get the data from the form, call the .addStory() method, and then
 * put the story on the page */

async function processStoryForm() {
  console.debug("processStoryForm");
  const author = $('#author').val();
  const title = $('#title').val();
  const url = $('#url').val();
  // console.log("Current object is", {author: author, title: title, url: url});

  const newStory = {author: author, title: title, url: url};
  const story = await storyList.addStory(currentUser, newStory);
  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  $('#author').val('');
  $('#title').val('');
  $('#url').val('');
  $storyForm.hide();

}

$storyForm.on('submit', function(event) {
  event.preventDefault();
  processStoryForm();
})


$allStoriesList.on('click', 'i', async function(event){
  //console.log($(this).attr("class") === "fa-star far")
  const storyid = $(this).parent().attr("id");

  if($(this).attr("class") === "fa-star far") {
    //console.log("Id is", $(this).parent().attr("id"))
    $(this).removeClass('far');
    $(this).addClass('fa');
    await currentUser.addFavorite(storyid)

  } else if($(this).attr("class")==="fa-star fa") {
    //console.log("Id is", $(this).parent().attr("id"))
    $(this).removeClass('fa');
    $(this).addClass('far');
    await currentUser.removeFavorite(storyid);
  }

})

$allStoriesList.on('click', 'button', async function(event){
  console.log("clicked")
  const storyid = $(this).parent().attr("id");
  await currentUser.removeStory(storyid);
  $(this).parent().remove();
})


