import { FC } from "react";

import cls from "./Sidebar.module.scss";
import { classNames } from "../../../../shared/lib/classNames/classNames";

export const Sidebar: FC = () => {

  return (
    <div className={classNames(cls.Sidebar, {}, [])}>
        
    </div>
  );
};