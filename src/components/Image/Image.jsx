import { useEffect, useState } from "react";

function Image({
    src,
    alt
}) {
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    const onError = () => {
        try {
            setImgSrc("/imagen404.png");
        } catch { }
    }

    return (
        <img onClick={() => {
            window.open(imgSrc, "_blank");
        }} onError={onError} src={imgSrc} alt={alt} />
    )
}
export default Image;