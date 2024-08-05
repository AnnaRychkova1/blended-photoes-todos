import { getPhotos } from 'apiService/photos';
import { Button, Form, Loader, PhotosGallery, Text } from 'components';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState(' ');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    if (!query.trim()) return;
    async function fetchPhotos() {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await getPhotos(query, page);

        if (data && Array.isArray(data.photos)) {
          setPhotos(prevPhotos => [...prevPhotos, ...data.photos]);
          setNextPage(data.next_page);
        } else {
          setIsError(true);
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPhotos();
  }, [query, page]);

  const handleQuery = newQuery => {
    setQuery(newQuery.trim().toLowerCase());
    setPage(1);
    setPhotos([]);
  };

  const loadMorePhotos = () => {
    if (nextPage) {
      const nextPageNumber = new URL(nextPage).searchParams.get('page');
      setPage(parseInt(nextPageNumber, 10));
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Form onSubmit={handleQuery} />
      {photos.length > 0 && !isError && <PhotosGallery array={photos} />}
      {nextPage && !isLoading && !isError && (
        <Button onClick={loadMorePhotos}>Load more</Button>
      )}
      {!isLoading && photos.length === 0 && !isError && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}
    </>
  );
};
