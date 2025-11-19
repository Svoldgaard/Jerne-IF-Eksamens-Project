
type BaggrundBoxProps = {
    children: React.ReactNode;
}

export default function Baggrund({children}: BaggrundBoxProps ) {
    return (
        <div className="baggrund-box">
            {children}
        </div>
    );
}