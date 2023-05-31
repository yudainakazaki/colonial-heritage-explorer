import style from '@/styles/NoImage.module.scss'

const NoImage = () => {
    return (
        <div className={style.bg}>
            <span className={style.bg__text}>
                No Image
            </span>
        </div>
    )
}

export default NoImage;