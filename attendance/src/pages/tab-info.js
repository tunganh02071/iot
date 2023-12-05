import Image from 'next/image'
import logo from '../images/Logo_PTIT_University.png'
import styles from '../styles/tab-info.module.css'

const TabInfo = () => {
    return (
        <div className={styles.containerTabInfo}>
            <div className={styles.contentTabInfo}>
                <div className={styles.containerLogo}>
                    <Image
                        alt='logo'
                        src={logo}
                        width={200}
                        height={'auto'}
                    />
                    <h1>Học viện Công nghệ Bưu chính viễn thông</h1>
                </div>
            </div>
            <br />
            <h1>ĐỀ TÀI: THIẾT KẾ MÔ HÌNH ĐIỂM DANH SINH VIÊN ỨNG DỤNG IOT</h1>
            <div className={styles.des}>
                <h3>Nhóm 7</h3>
                <h3>GVHD: Nguyễn Chiến Trinh</h3>
            </div>
        </div>
    )
}

export default TabInfo