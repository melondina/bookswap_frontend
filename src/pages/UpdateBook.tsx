import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux';




const AddNewBook: React.FC = () => {

    const user = useSelector((state) => state.user.user);
    
    const [updateBook, setUpdateBook] = useState({
        title: '',
        author: '',
        description: '',
        categoryId: '',
        languageId: '',
        pages: '',
        publisherDate: '',
        cover: '',
        owner: ''
    });
    // console.log("AddNewBook")

    interface ICreateNewBook {
        title: string,
        author: string,
        description: string,
        categoryId: string,
        languageId: string,
        pages: string,
        publisherDate: string,
        cover: string,
        owner: string
    }

    const navigate = useNavigate();
    // console.log(userId)

    const getLibrary =() =>{
        navigate(`/library`);
    }

    const bookUpdating = async (updateBook: ICreateNewBook) => {
        try {
            const newBookData = {
                ...updateBook,
                owner: user.id,
            };
            console.log(newBookData)
            const data = await axios.put(`/api/books/${id}`, newBookData);
            console.log("bookUpdating", data)
            return data;
        } catch (error) {
            console.log("bookUpdating",error)
        }
    }
    

    const handleAddBookForm = (event: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
        const {name, value} = event.target;
        setUpdateBook((prev) => ({
            ...prev, [name]:value
        }))
    }


    const handleAddNewBookSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const bookData = await bookUpdating(updateBook);
            if(bookData?.status===201) {
                navigate("/library");
            }
            console.log(bookData)
        } catch (error) {
            console.log(error)
        }
    }

    const { id } = useParams();
    console.log("title", id);
       

    return (
        <div className='container'>
            <h2 className="content__title">Update Book</h2> 
            <div className="addNewBook__items">
            <form onSubmit={handleAddNewBookSubmit} className='form addNewBook-wrap'>
                <div className='form__wrap addNewBook-wrap__top'>
                    <label  className='form__label' htmlFor="image">UPLOAD A BOOK COVER</label>
                    <input className='form__input' type="url" name="cover" onChange={handleAddBookForm} value={updateBook.cover} />
                </div>
                <div className="addNewBook-wrap__center-left">
                <div className='form__wrap'>
                        <label  className='form__label' htmlFor="bookName">BOOK NAME</label>
                        <input className='form__input' type="text" name="title" onChange={handleAddBookForm} value={updateBook.title}placeholder='Enter a book name' />
                </div>
                <div className='form__wrap'>
                    <label  className='form__label' htmlFor="author">AUTHOR</label>
                    <input className='form__input' type="text" name="author" onChange={handleAddBookForm} value={updateBook.author} placeholder='Enter a book author' />
                </div>
                <div className='form__wrap'>
                    <label  className='form__label' htmlFor="genre">GENRE</label>
                    <select className='form__input' name="categoryId" onChange={handleAddBookForm} value={updateBook.categoryId} >
                        <option value="" disabled>Choose genre</option>
                        <option value="1">Esse</option>
                        <option value="2">Detective</option>
                        <option value="3">Fantasy</option>
                        <option value="4">Roman</option>
                        <option value="5">Poetry</option>
                        <option value="6">Stories</option>
                        <option value="7">Biography</option>
                        <option value="8">History</option>
                        <option value="9">Fantastic</option>
                        <option value="10">Adventures</option>
                        <option value="11">Fairy tales</option>
                        <option value="12">Publicity</option>
                        <option value="13">Documentary prose</option>
                        <option value="14">Humor</option>
                        <option value="15">Horrors</option>
                        <option value="16">Fanfic</option>
                    </select>
                </div>

                </div>
                <div className="addNewBook-wrap__center-right">
                <div className='form__wrap'>
                    <label  className='form__label' htmlFor="pages">PAGE NUMBERS</label>
                    <input className='form__input' type="number" name="pages" onChange={handleAddBookForm} value={updateBook.pages} placeholder='Enter number of pages' />
                </div>
                <div className='form__wrap'>
                    <label  className='form__label' htmlFor="year">YEAR OF PUBLICATION</label>
                    <input className='form__input' type="number" name="publisherDate" onChange={handleAddBookForm} value={updateBook.publisherDate} placeholder='Enter year of publication' />
                </div>
                <div className='form__wrap'>
                    <label  className='form__label' htmlFor="language">LANGUAGE</label>
                    <select className='form__input' name="languageId" onChange={handleAddBookForm} value={updateBook.languageId} >
                        <option value="" disabled>Enter a book language</option>
                        <option value="1">English</option>
                        <option value="2">German</option>
                        <option value="3">French</option>
                        <option value="4">Russian</option>
                        <option value="5">Italian</option>
                        <option value="6">Ukrainian</option>
                    </select>
                </div>
                </div>
                
                <div className="addNewBook-wrap__bottom">
                <div className='form__wrap'>
                    <label  className='form__label' htmlFor="desc">DESCRIPTION</label>
                    <textarea className='form__input' name="description" onChange={handleAddBookForm} value={updateBook.description} placeholder='Write a description of a book' />
                </div>
                <div >
                    <button className='button button-profile' type='submit'>Update Book</button>
                    <button type='reset' className='button button-profile button-profile__right' onClick={()=>getLibrary()}>Cancel</button>
                </div>
                </div>
            </form>
            </div>
        </div>
    )}

    export default AddNewBook;