import type React from "react";
import Container, { BoxContainer } from "./container";
import CourseFilter from "./Courses/CourseFilter";
import Button from "./Button";
import type { IModelOpen } from "../types/comman.types";
import NoItems from "./NoItems";
import Loader from "./Loader";
import { useAppSelector } from "../hooks/redux.hook";

interface IHeader {
    name: string;
    canAdd: boolean;
    isFilter?: boolean;
    filter?: any;
    setFormOpen?: (data: IModelOpen) => void;
}

interface IPageWrapperProps {
    header: IHeader;
    total: number;
    children: React.ReactNode;
}

const PageWrapper: React.FC<IPageWrapperProps> = ({ header, total, children }) => {
    const isLoading = useAppSelector((state) => state.ui.isLoading);

    return (
        <Container>
            <BoxContainer>
                {/* Header */}
                <div className={`flex justify-${header.isFilter ? "between" : "end"} items-center`}>
                    {header.isFilter && <CourseFilter />}
                    {header.canAdd && (
                        <Button
                            variant="primary"
                            size="md"
                            onClick={() => {
                                if (header.setFormOpen) {
                                    header.setFormOpen({ isOpen: true, id: "" })
                                }
                            }}
                        >
                            Add {header.name}
                        </Button>
                    )}
                </div>

                {/* Content */}
                <div className="mt-3">
                    {isLoading ? <Loader /> : total > 0 ? (
                        children
                    ) : (
                        <NoItems title={header.name} />
                    )}
                </div>
            </BoxContainer>
        </Container>
    );
};

export default PageWrapper;
