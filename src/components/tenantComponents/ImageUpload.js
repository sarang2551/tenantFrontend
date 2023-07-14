import React, { useState, useEffect} from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import ServiceTicketCard from './STCard';

function ImageUpload() {
  const [images, setImages] = useState([]);
  // const [processedImages, setProcessedImages] = useState([]);


  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImages(selectedFiles);
    console.log(selectedFiles)
    onImageUpload(selectedFiles)
  };

  const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async () => {
    try {
      const base64Images = await Promise.all(images.map((file) => convertToBase64(file)));
  
      const imagesData = images.map((file, index) => {
        return {
          name: file.name,
          base64: base64Images[index],
        };
      });

      setProcessedImages(imagesData);
    } catch (error) {
      console.error('Error converting images to Base64:', error);
    }
  };

  return (


    <div>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      <button onClick={handleImageUpload}>Upload Images</button>

      {processedImages.length > 0 && <ServiceTicketCard ticketData={{images: processedImages}} />}
  </div>
);
};

export default ImageUpload;




  // const handleImageUpload = async () => {
  //   try {
  //     const base64Images = await Promise.all(images.map((file) => convertToBase64(file)));

  //     // Perform database upload with base64Images
  //     console.log('Base64 Images:', base64Images);
  //   } catch (error) {
  //     console.error('Error converting images to Base64:', error);
  //   }
  // };

  // // function ImageSlider(){
// //   const [image, setImage] = useState([])

// //   useEffect(() => {
// //     const fetchImages = async () =>{
// //       try{
// //         const response = await fetch('/api/images');
// //         const imageData = await response.json();
// //         setImage(imageData);
// //       }catch(error){
// //         console.error('Error fetching images:',error)
// //       }
// //     }
// //     fetchImages();
// //   }, [])

// //   return (
// //     <div>
// //       <h2>Image Slider</h2>
// //       <div className="slider">
// //         {image.map((image, index) => (
// //           <img key={index} src={`data:image/jpeg;base64,${image.base64}`} alt={image.name} />
// //         ))}
// //       </div>
// //     </div>
// //   );

// // }

// function ImageUpload() {
//   const [images, setImages] = useState([]);

//   const handleFileChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     setImages(selectedFiles);
//   };

//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result.split(',')[1]);
//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleImageUpload = async (e) => {
//     try {
//       const file = e.target.files[0]
//       const base64Images = await convertToBase64(file);

//       // const jsonData = JSON.stringify(imagesData);
//       console.log('Images JSON',setImages({ ...images, QuotationAttachment:base64Images}));

//     } catch (error) {
//       console.error('Error converting images to Base64:', error);
//     }
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   createPost(images)
//   // }


//   return (
//     <div>

//       <input type="file" name="QuotationAttachment" multiple accept="image/*" onChange={handleFileChange} />
//       <button onClick={handleImageUpload}>Upload Images</button>
   
//     </div>
//   );
// }

// export default ImageUpload;


// import React, { useState, useEffect, useDeferredValue} from 'react';

// function ImageSlider(){
//   const [image, setImage] = useState([])

//   useEffect(() => {
//     const fetchImages = async () =>{
//       try{
//         const response = await fetch('/api/images');
//         const imageData = await response.json();
//         setImage(imageData);
//       }catch(error){
//         console.error('Error fetching images:',error)
//       }
//     }
//     fetchImages();
//   }, [])

//   return (
//     <div>
//       <h2>Image Slider</h2>
//       <div className="slider">
//         {image.map((image, index) => (
//           <img key={index} src={`data:image/jpeg;base64,${image.base64}`} alt={image.name} />
//         ))}
//       </div>
//     </div>
//   );

// }


