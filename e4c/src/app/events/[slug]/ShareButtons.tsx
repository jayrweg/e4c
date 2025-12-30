'use client';

export default function ShareButtons({ eventTitle }: { eventTitle: string }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleInstagramShare = () => {
    // Instagram doesn't support web sharing, so we'll copy the link and show a message
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied! You can now paste it in your Instagram story or post.');
    } else {
      alert('Instagram sharing is available on the Instagram mobile app. Please copy this page URL and share it manually.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Share This Event</h3>
      <div className="flex flex-col gap-3">
        <button
          onClick={handleInstagramShare}
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300 text-sm font-semibold text-center"
        >
          Instagram
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300 text-sm font-semibold text-center"
        >
          LinkedIn
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(eventTitle)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 text-sm font-semibold text-center"
        >
          X
        </a>
      </div>
    </div>
  );
}
