import { assetUrl } from "../lib/assetUrl";

// A simple photo grid — thumbnails crop to a square (unlike the cover photo
// / badge slots elsewhere, which never crop) since that reads fine for a
// grid of real photographs; each one opens the untouched original in a new
// tab rather than a JS lightbox, so there's no extra dependency for it.
export default function PhotoGallery({ photos }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
      {photos.map((photo, i) => (
        <a
          key={i}
          href={assetUrl(photo)}
          target="_blank"
          rel="noreferrer"
          className="block aspect-square rounded-lg overflow-hidden border border-line"
        >
          <img
            src={assetUrl(photo)}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </a>
      ))}
    </div>
  );
}
