import { Grid, PhotosGalleryItem } from '..';

export const PhotosGallery = ({ array }) => {
  return (
    <Grid>
      {array.map(item => (
        <PhotosGalleryItem key={item.id} {...item} />
      ))}
    </Grid>
  );
};
