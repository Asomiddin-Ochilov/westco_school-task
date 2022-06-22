import React from 'react'
import Fade from 'react-reveal/Fade';
const Feedbeack = () => {
     return (
          <div className='feedbeack page'>
               <div className="left">
                    <i className="bi bi-quote"></i>
               </div>
               <div className="right">
                    <Fade bottom>
                         <div className="font title">
                              Students Feedbeack
                         </div>
                    </Fade>

                    <div className="line"></div>
                    <div className="message">
                         <div className="user">
                              <img src="/assets/images/user.jpg" alt="" />
                              <div className="user_name font">
                                   Asomiddin Ochilov
                              </div>
                         </div>
                         <div className="text">
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Laudantium beatae eius
                              unde similique, iusto repellendus nemo
                              doloribus distinctio quibusdam, voluptatem
                              reiciendis? Provident quas officia cumque
                              excepturi accusantium ut molestias maiores.
                         </div>
                         <div className="footer">
                              <div className="stars">
                                   <i className="bi bi-star-fill"></i>
                                   <i className="bi bi-star-fill"></i>
                                   <i className="bi bi-star-fill"></i>
                                   <i className="bi bi-star-fill"></i>
                                   <i className="bi bi-star"></i>
                              </div>

                              <div className="right">
                                   <i className="bi bi-arrow-left"></i>
                                   <i className="bi bi-arrow-right"></i>
                              </div>
                         </div>
                    </div>

               </div>
          </div>
     )
}

export default Feedbeack