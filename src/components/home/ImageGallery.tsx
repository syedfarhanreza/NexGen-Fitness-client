import PhotoAlbum from "react-photo-album";
import SectionHeading from "../ui/sectionHeading";

const ImageGallery = () => {
  const photos = [
    { src: "/images/640X480.jpg", width: 640, height: 480 },
    { src: "/images/840X520.jpg", width: 840, height: 520 },
    { src: "/images/800X1422.jpg", width: 800, height: 1422 },
    { src: "/images/847X477.jpg", width: 1200, height: 500 },
    { src: "/images/1920X1281.jpg", width: 1920, height: 1281 },
    { src: "/images/900X600.webp", width: 900, height: 600 },
    { src: "/images/1109X614.webp", width: 1109, height: 614 },
    { src: "/images/1150X750.jpg", width: 1109, height: 614 },
    { src: "/images/696X369.jpg", width: 696, height: 369 },
  ];
  return (
    <section className="w-full mt-[50px]">
      <SectionHeading text="Image Gallery" />
      <p className="text-[16px] text-primaryTxt font-[500] max-w-[550px]">
        Explore our mosaic of images featuring vibrant individuals who have
        embraced health with our products.
      </p>
      <div className="w-full rounded-[10px] overflow-hidden mt-[40px]">
        <PhotoAlbum layout="rows" photos={photos} />;
      </div>
    </section>
  );
};

export default ImageGallery;
