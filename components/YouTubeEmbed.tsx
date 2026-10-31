export default function YouTubeEmbed() {
  return (
    <div className="video-frame">
      <iframe
        src="https://www.youtube.com/embed/77wkD0K10xw"
        title="Your consultation next steps"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
