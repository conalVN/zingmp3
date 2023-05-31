import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, createSearchParams } from "react-router-dom";

import { Button } from "../components";
import path from "../ultis/path";
import * as actions from "../store/actions";
import icons from "../ultis/icons";
const { GrLinkNext, GrLinkPrevious, GrFormClose, CiSearch } = icons;

function Header({ isShow }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      // dispatch(actions.play(true));
      dispatch(actions.search(keyword));
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
      // dispatch(actions.play(false));
    }
  };

  return (
    <div
      className={`fixed z-30 top-0 left-[240px] right-0 h-header px-[59px] flex items-center justify-between transition ${
        isShow && "bg-header"
      }`}
    >
      <div className="flex items-center justify-start gap-5 w-full">
        <span onClick={() => navigate(-1)}>
          <GrLinkPrevious size={24} />
        </span>
        <span onClick={() => navigate(1)}>
          <GrLinkNext size={24} />
        </span>
        <label
          className={`flex items-center gap-2 w-1/2 px-1 rounded-3xl max-w-[440px] text-[18px] text-white bg-alpha`}
        >
          <CiSearch size={24} />
          <input
            className="flex-1 w-full text-sm placeholder-white bg-transparent border-none outline-none py-[5px]"
            type="text"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyUp={handleSearch}
          />
          {keyword && (
            <span className="p-1 text-white" onClick={() => setKeyword("")}>
              <GrFormClose />
            </span>
          )}
        </label>
      </div>
      <div className="text-white">
        <Button
          title="Đăng nhập"
          styles="min-w-max text-[14px] font-bold py-[10px] px-6"
        />
      </div>
    </div>
  );
}

export default memo(Header);
