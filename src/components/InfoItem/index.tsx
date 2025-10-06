interface InfoItemProps {
    title: string;
    subTitle?: React.ReactNode;
    icon?: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({ title, subTitle, icon }) => (
    <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-md shadow-sm">
        {icon && <div className="flex items-center justify-center w-8 h-8 md:w-11 md:h-11 rounded bg-indigo-100">{icon}</div>}
        <div className="flex flex-col items-start gap-0">
            <span className="text-sm md:text-base font-semibold md:font-bold text-gray-700">{title}</span>
            {subTitle && <span className="text-xs md:text-sm  text-gray-500">{subTitle}</span>}
        </div>
    </div>
);

export default InfoItem;