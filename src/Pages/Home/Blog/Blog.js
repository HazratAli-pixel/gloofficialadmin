import React from 'react';
import useTitle from '../../../hooks/useTitle';

const Blog = () => {
    useTitle('Blog')
    let qsn1 = " Not only are there are a lot of different kinds of state, but there often dozens of ways of managing each kind. Which should you choose? In this guide, we will uncover the several kinds of state in your React apps that you might not be aware of, plus how to manage them in the most effective way.Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least."
    let qsn2 = " JavaScript is a prototype-based, Object Oriented programming language. After the ES6 updates, JavaScript allowed for “prototypal inheritance”, meaning that objects and methods can be shared, extended, and copied. Sharing amid objects makes for easy inheritance of structure (data fields), behavior (functions / methods), and state (data values).JavaScript is the most common of the prototype-capable languages, and its capabilities are relatively unique. When used appropriately, prototypical inheritance in JavaScript is a powerful tool that can save hours of coding.Today, we want to get you acquainted with prototypal inheritance in JavaScript to get you up to date with the ES6 capabilities."
    let qsn3 = " is a type of software testing where individual units or components of a software are tested. The purpose is to validate that each unit of the software code performs as expected. Unit Testing is done during the development (coding phase) of an application by the developers. Unit Tests isolate a section of code and verify its correctness. A unit may be an individual function, method, procedure, module, or object. In SDLC, STLC, V Model, Unit testing is first level of testing done before integration testing. Unit testing is a WhiteBox testing technique that is usually performed by the developer. Though, in a practical world due to time crunch or reluctance of developers to tests, QA engineers also do unit testing."
    return (
        <div className='container mx-auto'>
            <div className=' rounded-3 m-0 p-2'>
                <h1 className='text-2xl text-center font-bold p-3 bg-gradient-to-r from-violet-50 via-violet-600 to-violet-50 rounded-lg text-white'>Questions And Answer</h1>
                <div className='w-full mt-5 rounded-lg bg-slate-50 border-2 border-slate-400'>
                    <div className='pl-2 pr-2 pt-2'>
                    <p className="bg-gradient-to-r text-2xl from-violet-200  to-purple-600 p-4 rounded-lg font-extrabold text-slate-800 text-start" >What are the different ways to manage a state in a React application?</p>
                    </div>
                    <div className='rounded-lg  m-2 p-2'>
                        <p className='text-start py-2'><strong>Answer: </strong></p>
                        <div className='flex justify-center'>
                            <img src="https://www.freecodecamp.org/news/content/images/size/w2000/2022/02/how-to-manage-state-react.png" alt="" />
                        </div>
                        <div className='flex justify-center flex-col pt-8'>
                            <p className='text-start py-2'><strong className='italic'>Ans: </strong>{qsn1} </p>
                        </div>
                    </div>
                </div>


                <div className='w-full mt-5 rounded-lg bg-slate-50 border-2 border-slate-400'>
                    <div className='pl-2 pr-2 pt-2'>
                        <p className="bg-gradient-to-r text-2xl from-violet-200  to-purple-600 p-4 rounded-lg font-extrabold text-slate-800 text-start" > How does prototypical inheritance work?</p>
                    </div>
                    <div className='rounded-lg m-2 px-2'>
                        <p className='text-start py-2'><strong>Answer: </strong></p>
                        <div className='flex justify-center'>
                            <img src="https://www.educative.io/api/page/6187859468877824/image/download/6346760642363392" alt="" />
                        </div>
                        <div className='flex justify-center flex-col pt-5'>
                            <p className='text-start py-2'>{qsn2}</p>
                        </div>
                                
                    </div>
                </div>


                <div className='w-full mt-5 rounded-lg bg-slate-50 border-2 border-slate-400'>
                    <div className='pl-2 pr-2 pt-2'>
                        <p className="bg-gradient-to-r text-2xl from-violet-200  to-purple-600 p-4 rounded-lg font-extrabold text-slate-800 text-start" >What is a unit test? Why should we write unit tests?</p>
                    </div>
                    <div className='rounded-lg m-2 px-2'>
                        <p className='text-start py-2'><strong>Answer: </strong></p>
                        <div className='flex justify-center'>
                            <img src="https://www.guru99.com/images/1/Unit-Testing.png" alt="" />
                        </div>
                        <div className='flex justify-center flex-col pt-5'>
                            <p className='text-start py-2'><strong>Unit Testing</strong> {qsn3}</p>
                            <p className='text-start py-2'><strong>How to execute Unit Testing </strong> In order to execute Unit Tests, developers write a section of code to test a specific function in software application. Developers can also isolate this function to test more rigorously which reveals unnecessary dependencies between function being tested and other units so the dependencies can be eliminated. Developers generally use UnitTest framework to develop automated test cases for unit testing.</p>
                        </div>
                                
                    </div>
                </div>
                <div className='w-full mt-5 rounded-lg bg-slate-50 border-2 border-slate-400'>
                    <div className='pl-2 pr-2 pt-2'>
                        <p className="bg-gradient-to-r text-2xl from-violet-200  to-purple-600 p-4 rounded-lg font-extrabold text-slate-800 text-start" > React vs. Angular vs. Vue?</p>
                    </div>
                    
                    <div className='rounded-lg m-2 p-2'>
                    <div className='flex justify-center'>
                            <img src="https://www.sphinx-solution.com/blog/wp-content/uploads/2019/05/angular_react_vue_main.jpg" alt="" />
                        </div>
                        <p className='text-start py-2'><strong>Angular vs React: </strong>If the choice you’re making is based on Angular vs React alone, then you’ll simply need to consider the pros and cons discussed for those libraries in this post. But overall, keep in mind that both libraries can be used for mobile and web apps, while Angular is generally better for more complex apps that are enterprise-ready.
React often requires extra modules and components, which keeps the core library small, but means there’s extra work involved when incorporating outside tools. Angular, on the other hand, is more of a full-fledged solution that doesn’t require extras like React often does, though it does have a steeper learning curve for its core compared to React.</p>
                        <p className='text-start py-2'><strong>Vue vs React: </strong>The choice between React vs Vue is often debated and it’s not an easy one. Vue has a vibrant and ever-growing community and has taken over popularity vs. React in many respects. React developers are still churning out lots of new components and extras, so there’s no sign that React is on the decline either.
Vue is generally more suited to smaller, less complex apps and is easier to learn from scratch compared to React. Vue can be easier to integrate into new or existing projects and many feel its use of HTML templates along with JSX is an advantage..</p>
                        <p className='text-start py-2'><strong>Angular vs Vue : </strong>In most cases, you probably wouldn’t be deciding between only Angular and Vue. They are vastly different libraries with very different feature sets and learning curves. Vue is the clear choice for less experienced developers, and Angular would be preferred for those working on larger apps.
A large library like Angular would require more diligence in keeping up with what’s new, while Vue would be less demanding in this regard and the fact that the two most recent major releases of Vue are in separate repositories helps.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;