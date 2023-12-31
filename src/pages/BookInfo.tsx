import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { navigationStatus } from '../redux/slices/navigationSlice.js'




interface IBooks {
    bookId: number,
    title: string,
    author: string,
    description: string,
    category: string,
    language: string,
    pages: number,
    publisherDate: number,
    cover: string,
    location: string,
    queueSize: number
}



const BookInfo: React.FC<IBooks> = ({
    bookId,
    title,
    author,
    description,
    category,
    language,
    pages,
    publisherDate,
    cover,
    location,
    queueSize,
}) => {

    const getNavigationStatus = useSelector((state) => state.navigation);
    // console.log("🚀 ~ file: BookInfo.tsx:27 ~ getNavigationStatus:", getNavigationStatus)

    const dispatch = useDispatch();


    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const { id } = useParams();
    console.log("bookId", id);

    // console.log("userId", user.id)


    const [book, setBook] = useState<IBooks | null>(null);

    const [getBook, setGetBook] = useState({
        bookId: '',
        userId: ''
    });

    console.log("getBook.bookId", getBook.bookId);

    interface IGetBook {
        bookId: string,
        userId: string
    }


    const getBookCreating = async (getBook: IGetBook) => {
        try {
            const newGetBook = {
                ...getBook,
                userId: user.id,
                bookId: id
            };
            console.log("newGetBook", newGetBook)
            const data = await axios.post(`/api/books/getting`, newGetBook);
            console.log("getBookCreating", data)
            return data;
        } catch (error) {
            console.log("getBookCreating", error)
        }
    }

    const handleGetBook = async () => {
        try {
            const getBookData = await getBookCreating(getBook);
            if (getBookData?.status === 200) {
                navigate("/library");
            } else (navigate("/"))
            console.log("getBookData", getBookData)
        } catch (error) {
            console.log(error)
        }
    }

    const sendBookCreating = async (getBook: IGetBook) => {
        try {
            const newSendBook = {
                ...getBook,
                userId: user.id,
                bookId: id
            };
            console.log("newGetBook", newSendBook)
            const data = await axios.post(`/api/books/send/to`, newSendBook);
            console.log("sendBookCreating", data)
            return data;
        } catch (error) {
            console.log("sendBookCreating", error)
        }
    }

    const handleSendBook = async () => {
        try {
            const sendBookData = await sendBookCreating(getBook);
            if (sendBookData?.status === 200) {
                navigate("/library");
            } else (navigate("/"))
            console.log("getBookData", sendBookData)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteBookCreating = async (getBook: IGetBook) => {
        try {
            const newDeleteBook = {
                ...getBook,
                userId: user.id,
                bookId: id
            };
            console.log("newDeleteBook", newDeleteBook)
            // const data = await axios.delete(`/api/books/remove`, newDeleteBook);

            const response: AxiosResponse<{  }> = await axios.delete(`/api/books/remove`, {
                data: newDeleteBook,
            });

            console.log("deleteBookCreating", response)
            return response.data;
        } catch (error) {
            console.log("deleteBookCreating", error)
        }
    }

    const handleDeleteBook = async () => {
        try {
            const deleteBookData = await deleteBookCreating(getBook);
            if (deleteBookData?.status === 200) {
                navigate("/library");
            } else (navigate("/library"))
            console.log("deleteBookData", deleteBookData)
        } catch (error) {
            console.log(error)
        }
 
    }




    useEffect(() => {

        const fetchBook = async () => {
            try {
                const response = await axios.get(`/api/books/${id}/detail`);
                if (response?.status === 200) {
                    setBook(response.data);
                }
                // console.log("dataBook", response.data.title);
            } catch (error) {
                console.error('Ошибка при запросе к серверу:', error);
            }
        };

        fetchBook();
    }, [id]);


    return (
        <div className='book'>
            <div className='book__container'>
                <div>
                    <img className='book__img' src={book?.cover} alt="Book" />
                </div>
                <div>
                    <p className='book__title'>{book?.title}</p>
                    <p className='book__title'>{book?.author}</p>
                    <p className='book__genre'>{book?.category}</p>
                    <p className='book__genre'>{book?.language}</p>
                    <p className='book__textbold__1'>Description:</p>
                    <p className='book__line'>{book?.description}</p>
                    <div className='book__column'>
                        <div><p className='book__textbold__1'>Number of pages:</p></div>
                        <div><p className='book__textbold__1'>{book?.pages}</p></div>
                    </div>
                    <div className='book__column'>
                        <div><p className='book__textbold'>Year of publication:</p></div>
                        <div><p className='book__textbold'>{book?.publisherDate}</p></div>
                    </div>
                    <div className='book__column'>
                        <div><p className='book__textbold'>Wait line:</p></div>
                        <div><p className='book__textbold'>{book?.queueSize}</p></div>
                    </div>
                    <p className='book__textbold__1'>Current Location:</p>
                    <p className='book__textbold'>{book?.location}</p>
                    <div className='book__button'>
                        {getNavigationStatus === navigationStatus.get ?<button className='button' onClick={() => { user === null ? navigate("/login") : handleGetBook() }}>Get book</button> : null}
                        {/* {getNavigationStatus === navigationStatus.update ?<button className='button' onClick={() => navigate(`/updateBook/${id}`)} >Update Book</button> : null} */}
                        {getNavigationStatus === navigationStatus.send ?<button className='button' onClick={handleSendBook}>Send Book</button> : null}
                        {getNavigationStatus === navigationStatus.history ? <button className='button' >Leave a comment</button> : null}
                        {getNavigationStatus === navigationStatus.delete ? <button className='button' onClick={handleDeleteBook} >Delete</button> : null}
                        {getNavigationStatus === navigationStatus.update ? (
              <button className='button'>
                {/* Используем Link для передачи книги через пропсы */}
                <Link 
                  to={`/updateBook/${id}`}
                  // Передаем книгу через пропс
                  state={{
                    book: {
                      bookId,
                      title,
                      author,
                      description,
                      category,
                      language,
                      pages,
                      publisherDate,
                      cover,
                      location,
                      queueSize,
                    },
                  }}
                >
                  Update Book
                </Link>
              </button>
            ) : null}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BookInfo;