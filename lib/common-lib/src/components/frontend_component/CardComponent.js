import React from 'react'
import { HStack, VStack, Box, Progress, Divider } from 'native-base'
import { useTranslation } from 'react-i18next'
import IconByName from '../IconByName'
import ImageView from '../ImageView'
import * as FrontEndTypo from '../frontend_component'
import { arrList } from '../helper'

export function CardComponent({
  title,
  format,
  arr,
  label,
  item,
  onEdit,
  onDelete,
  isHideProgressBar,
  icon,
  children,
  _hstack,
  _vstack
}) {
  const { t } = useTranslation()
  return (
    <VStack
      px='5'
      py='4'
      space='5'
      borderRadius='10px'
      borderWidth='1px'
      bg='white'
      borderColor='appliedColor'
      {..._vstack}
    >
      <HStack justifyContent='space-between' alignItems='Center'>
        {title && (
          <FrontEndTypo.H3 fontWeight='700' bold color='textGreyColor.800'>
            {title}
          </FrontEndTypo.H3>
        )}
        <HStack alignItems='center'>
          {onEdit && (
            <IconByName
              name='EditBoxLineIcon'
              color='iconColor.100'
              onPress={(e) => onEdit(item)}
            />
          )}
          {onDelete && (
            <IconByName
              color='textMaroonColor.400'
              name='DeleteBinLineIcon'
              onPress={(e) => onDelete(item)}
            />
          )}
        </HStack>
      </HStack>

      {!isHideProgressBar && item ? (
        <Box paddingTop='2'>
          <Progress value={arrList(item, arr)} size='xs' colorScheme='info' />
        </Box>
      ) : (
        title && <Divider />
      )}
      {children || (
        <VStack space='2' paddingTop={title ? '4' : '0'}>
          {arr?.map((key, index) => {
            return (
              <HStack
                key={key}
                alignItems='Center'
                justifyContent='space-between'
                borderBottomWidth='1px'
                borderBottomColor='appliedColor'
                {..._hstack}
              >
                <FrontEndTypo.H3
                  color='textGreyColor.50'
                  fontWeight='400'
                  flex='3'
                  {...(label?.[key]?._text || {})}
                >
                  {t(label?.[key]?.label || label?.[index] || key)}
                </FrontEndTypo.H3>
                <HStack justifyContent='space-between' flex='4'>
                  <FrontEndTypo.H3 color='textGreyColor.800' fontWeight='400'>
                    {['FileUpload', 'file', 'img', 'Image'].includes(
                      format?.[key]
                    ) || key === 'document_id' ? (
                      <ImageView
                        source={{ document_id: item?.[key] }}
                        urlObject={item?.[key]}
                        _button={{ p: 0 }}
                        text={
                          <HStack space={'2'}>
                            {t('LINK')}
                            <IconByName
                              name='ExternalLinkLineIcon'
                              isDisabled
                            />
                          </HStack>
                        }
                      />
                    ) : item?.[key] ? (
                      item?.[key]
                    ) : (
                      '-'
                    )}
                  </FrontEndTypo.H3>
                  {icon?.[index] && <IconByName {...icon?.[index]} />}
                </HStack>
              </HStack>
            )
          })}
        </VStack>
      )}
    </VStack>
  )
}

export default React.memo(CardComponent)
