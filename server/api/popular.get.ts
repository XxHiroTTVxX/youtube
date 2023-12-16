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

function formatDuration(lengthSeconds: number) {
  const hours = Math.floor(lengthSeconds / 3600);
  const minutes = Math.floor((lengthSeconds % 3600) / 60);
  const seconds = lengthSeconds % 60;

  const duration = `${hours > 0 ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  return duration;
}

export default defineEventHandler(async (data) => {
  try {
    const response = await fetch('https://inv.tux.pizza/api/v1/popular');
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    const data = await response.json();


    const thumbnail = ((video: any) => {
      const sddefaultThumbnail = video.videoThumbnails.find((thumbnail: { quality: string; }) => thumbnail.quality === 'sddefault');
      const sddefaultUrl = sddefaultThumbnail.url;
      return sddefaultUrl;
    });


    return data.map((item: any) => ({
      title: item.title,
      author: item.author,
      time: item.publishedText,
      thumbnail: thumbnail(item),
      views: formatViewCount(item.viewCount),
      duration: formatDuration(item.lengthSeconds),
    }));


  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      data: JSON.stringify({ error: 'Something went wrong' }),

    };
  }
});
