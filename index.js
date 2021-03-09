async function fetchTopStories() {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  );
  const result = await response.json();
  result.splice(30, 470);

  let stories = [];

  for (const id of result) {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );

    const storiesResult = await response.json();

    stories.push(storiesResult);
  }


  let body = document.querySelector('body')
 
  function displayStories() {
    stories.forEach((story) => {
        let topStory = document.createElement('div')

        let number = stories.indexOf(story) + 1

        let title = document.createElement('a')
        topStory.appendChild(title)


        let info = document.createElement('p')
        if (story.url == undefined) {
            title.href = `https://news.ycombinator.com/item?id=${story.id}`
            title.target="_blank"
        } else {
            title.href = `${story.url}`
            let link = document.createElement('a')
            link.className = "link"
            link.innerHTML = ` (${story.url.split('/')[2]})`
            link.href = `https://news.ycombinator.com/from?site=${story.url.split('.')[1]}.com`
            topStory.appendChild(link)
        }

        title.innerHTML = `${number}. ${story.title}`
        
        info.innerHTML = `${story.score} points by ${story.by}`

        topStory.appendChild(info)
        body.appendChild(topStory)
    });
  }

  displayStories();
}

fetchTopStories();
