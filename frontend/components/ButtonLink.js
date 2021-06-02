import React, {forwardRef, Ref} from "react";
import Link, {LinkProps} from "next/link";
import {Button, ButtonProps} from "@material-ui/core";

const NextLink = ({href, as, prefetch, locale, target, ...props}, ref) => {
    if (target) {
        return (
            <a href={href} target={'_blank'}>
                <Button buttonRef={ref} {...props} />
            </a>
        );
    } else {
        return (
            <Link href={href} as={as} target={'_blank'} prefetch={prefetch} locale={locale} passHref>
                <Button buttonRef={ref} {...props} />
            </Link>
        );
    }

}


export default forwardRef(NextLink);
