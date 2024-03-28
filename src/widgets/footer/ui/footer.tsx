import { Link } from 'react-router-dom'
import clsx from 'clsx'
import Email from 'shared/assets/icons/email.svg?react'
import Github from 'shared/assets/icons/github.svg?react'
import Telegram from 'shared/assets/icons/telegram.svg?react'

import './footer.scss'

export const Footer = ({ className }: { className?: string }) => {
    return (
        <div className={clsx('footer', className)}>
            <div className='footer__wrapper _container'>
                <div className='footer__col'>
                    <h5 className='footer__header'>Popular books</h5>
                    <ul className='footer__list'>
                        <li>
                            <Link to='/books/Python'>Python</Link>
                        </li>
                        <li>
                            <Link to='/books/JavaScript'>JavaScript</Link>
                        </li>
                        <li>
                            <Link to='/books/TypeScript'>TypeScript</Link>
                        </li>
                        <li>
                            <Link to='/books/Android'>Android</Link>
                        </li>
                    </ul>
                </div>

                <div className='footer__col'>
                    <h5 className='footer__header'>About me</h5>
                    <ul className='footer__list'>
                        <li>
                            <Telegram />
                            <a
                                href='https://t.me/kozaaq'
                                target='_blank'
                                rel='noreferrer'>
                                Telegram
                            </a>
                        </li>
                        <li>
                            <Github />
                            <a
                                href='https://github.com/UmttikhinaDasha'
                                target='_blank'
                                rel='noreferrer'>
                                GitHub
                            </a>
                        </li>
                        <li>
                            <Email />
                            <a
                                href='mailto:darya.125viis.467@gmail.com'
                                target='_blank'
                                rel='noreferrer'>
                                Email
                            </a>
                        </li>
                    </ul>
                </div>

                <div className='footer__col'>
                    <h5 className='footer__header'>Useful links</h5>
                    <ul className='footer__list'>
                        <li>
                            <a
                                href='https://api.itbook.store/'
                                target='_blank'
                                rel='noreferrer'>
                                API used
                            </a>
                        </li>
                        <li>
                            <a
                                href='https://itbook.store/books/free'
                                target='_blank'
                                rel='noreferrer'>
                                Free eBooks
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
