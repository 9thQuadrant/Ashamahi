import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateCategories } from "../../services/AppActions";
import { AppContext } from '../../services/context';
import './category-list.scss';


const CategoryListComponent = (): JSX.Element => {

    const {state: {isMobile, categoryList}, dispatch} = useContext(AppContext) as any;

    useEffect(()=>{
        if (!categoryList.size) {
            dispatch(updateCategories(new Set()));
        }
    }, []);

    return <>
            <div className={`category-list-parent ${isMobile ? 'mobile': 'desktop'}`}>
            {
                Array.from(categoryList).map((cat: any, i: any) => {
                    return <div className={`category-parent ${isMobile ? 'mobile': 'desktop'}`} key={cat}>
                        <Link to={'category/' + cat}>{cat}</Link>
                    </div>;
                })
            }
        </div>
    </>;
}

export default CategoryListComponent;