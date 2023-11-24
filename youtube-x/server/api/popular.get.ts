
function formatViewCount(viewCount: number) {
  if (viewCount >= 1000000000) {
    return `${(viewCount / 1000000000).toFixed(1)}B`;
  }
  if (viewCount >= 1000000) {
    return `${(viewCount / 1000000).toFixed(1)}M`;
  }
  if (viewCount >= 1000) {
    return `${(viewCount / 1000).toFixed(1)}K`;
  }
  return viewCount.toString();
}

export default defineEventHandler(async (event) => {
  try {
    const response = await fetch('https://inv.tux.pizza/api/v1/popular');
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    const data = await response.json();
    const cards = data.map((item: { title: any; videoId: any; publishedText: any; author: any; viewCount: any; lengthSeconds: any; videoThumbnails: any; }) => {
      const title = item.title;
      const videoId = item.videoId;
      const publishedText = item.publishedText;
      const author = item.author;
      const viewCount = item.viewCount;
      const formatedViewCount = formatViewCount(viewCount);

      const lengthSeconds = item.lengthSeconds;
      const minutes = Math.floor(lengthSeconds / 60);
      const seconds = lengthSeconds % 60;
      const duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      const videoThumbnails = item.videoThumbnails;
      const sddefaultThumbnail = videoThumbnails.find((thumbnail: { quality: string; }) => thumbnail.quality === 'sddefault')
      const sddefaultUrl = sddefaultThumbnail.url;

      return `
          ${sddefaultUrl}
          ${title}
          ${author}
          ${formatedViewCount}
          ${duration}
          ${publishedText}
      `;
    });

    const json = `
          ${cards.join('')}
    `;

    return {
      body: json,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
});
